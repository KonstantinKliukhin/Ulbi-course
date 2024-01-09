import {
  type FC, memo, type ReactNode, useEffect,
  useMemo, useRef,
  useState
} from 'react';
import { Loader } from '../../../ui/Loader/Loader';
import { pick } from '../../utils/pick/pick';

export interface LibrariesRecord {
  dndKitCore?: DndKitCoreType;
  dndKitSortable?: DndKitSortableType;
  dndKitModifiers?: DndKitModifiersType;
  dndKitUtils?: DndKitUtilsType;
}

export type AsyncLibrariesNames = keyof LibrariesRecord;

interface WithLibrariesOptions<Libs extends AsyncLibrariesNames[]> {
  libraries: Libs;
  loadingComponent?: ReactNode;
}

type GetLibsByNames<Libs extends AsyncLibrariesNames[]> = Pick<Required<LibrariesRecord>, Libs[number]>;

export type WithLibrariesProps<Libs extends AsyncLibrariesNames[]> =
  Pick<Required<LibrariesRecord>, Libs[number]>;

type UseLibrariesReturn<Libs extends AsyncLibrariesNames[]> = (GetLibsByNames<Libs> & { isLoading: false }) |
(Partial<GetLibsByNames<Libs>> & { isLoading: true });

const mapLibraryToLoader: { [Key in AsyncLibrariesNames]: () => Promise<LibrariesRecord[Key]> } = {
  dndKitCore: async () => import('@dnd-kit/core'),
  dndKitSortable: async () => import('@dnd-kit/sortable'),
  dndKitModifiers: async () => import('@dnd-kit/modifiers'),
  dndKitUtils: async () => import('@dnd-kit/utilities'),
};

export const useLibraries =
  <Libs extends AsyncLibrariesNames[]>(libs: Libs): UseLibrariesReturn<Libs> => {
    const librariesRef = useRef<Partial<GetLibsByNames<Libs>>>({});
    const [isLoading, setIsLoading,] = useState(true);

    useEffect(() => {
      setIsLoading(true);

      void Promise.all(libs.map(async lib => mapLibraryToLoader[lib]()))
        .then((loadedLibs) => {
          const loadedLibsRecord = libs.reduce((acc, libName, currentIndex) => ({
            ...acc,
            [libName]: loadedLibs[currentIndex],
          }), {});
          librariesRef.current = {
            ...librariesRef.current,
            ...loadedLibsRecord,
          };
          setIsLoading(false);
        });
    }, [libs,]);

    return useMemo(() => ({
      ...librariesRef.current,
      isLoading,
    }), [isLoading,]);
  };

export const withLibraries = <Libs extends AsyncLibrariesNames[]>(options: WithLibrariesOptions<Libs>) =>
  <Props extends WithLibrariesProps<Libs>>(Component: FC<Props>): FC<Omit<Props, keyof LibrariesRecord>> => {
    const ReturnComponent = memo(
      function ReturnComponent (props: Omit<Props, keyof LibrariesRecord>) {
        const librariesData = useLibraries(options.libraries);

        if (librariesData.isLoading) {
          return options?.loadingComponent ?? <Loader centered />;
        } else {
          const componentProps = {
            ...props,
            ...pick(librariesData, ...options.libraries),
          } as unknown as Props;

          return <Component {...componentProps} />;
        }
      });

    ReturnComponent.displayName = `withLibraries(${Component.displayName})`;

    return ReturnComponent;
  };
