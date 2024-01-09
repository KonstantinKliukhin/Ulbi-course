import cls from './DropRegions.module.scss';
import { memo } from 'react';
import { DropRegion } from '../../constants/dropRegions';
import {
  type AsyncLibrariesNames,
  withLibraries,
  type WithLibrariesProps
} from '../../../../lib/providers/withLibraries/withLibraries';

const usedLibraries: AsyncLibrariesNames[] = ['dndKitCore',];

const DropRegions = memo<WithLibrariesProps<typeof usedLibraries>>(function DropRegions (props) {
  const { dndKitCore, } = props;
  const { active, setNodeRef: setExpandRegionNodeRef, } = dndKitCore.useDroppable({
    id: DropRegion.EXPAND,
  });
  const { setNodeRef: setCollapseRegionRef, } = dndKitCore.useDroppable({
    id: DropRegion.COLLAPSE,
  });

  if (active) {
    return (
      <div className={cls.DropRegions}>
        <div ref={setExpandRegionNodeRef} />
        <div ref={setCollapseRegionRef} />
      </div>
    );
  } else {
    return null;
  }
});

const WithDndKitDropRegions = withLibraries({
  libraries: usedLibraries,
})(DropRegions);

export { WithDndKitDropRegions as DropRegions };
