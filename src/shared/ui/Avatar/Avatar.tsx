import {
  type CSSProperties,
  type FC,
  type ImgHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import cls from './Avatar.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import DefaultAvatar from '../../../../public/assets/icons/avatar-200-200.png';

type ImageProps = Omit<
ImgHTMLAttributes<HTMLImageElement>,
'src' | 'alt' | 'style'
>;

interface AvatarProps extends ImageProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  defaultAvatar?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const {
    className,
    size,
    alt,
    src,
    defaultAvatar = DefaultAvatar,
    ...inputProps
  } = props;

  const [avatarSrc, setAvatarSrc,] = useState<string>(src ?? defaultAvatar);

  const style = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size,]
  );

  const onError = useCallback(() => {
    setAvatarSrc(defaultAvatar);
  }, [defaultAvatar,]);

  useEffect(
    function resetSrc () {
      setAvatarSrc(src ?? defaultAvatar);
    },
    [src, defaultAvatar,]
  );

  return (
    <img
      {...inputProps}
      src={avatarSrc}
      alt={alt ?? 'Avatar'}
      onError={onError}
      style={style}
      className={classNames(cls.Avatar, {}, [props.className,])}
    />
  );
};
