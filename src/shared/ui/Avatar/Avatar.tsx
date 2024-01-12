import {
  type CSSProperties,
  type FC,
  type ImgHTMLAttributes,
  useMemo
} from 'react';
import cls from './Avatar.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { AvtarIcon } from '../../assets';
import { AppImage } from '../AppImage/AppImage';
import { Skeleton } from '../Skeleton/Skeleton';

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
    defaultAvatar = AvtarIcon,
    ...imageProps
  } = props;

  const avatarStyle = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size,]
  );

  const avatarClassList = classNames(cls.Avatar, {}, [props.className,]);

  return (
    <AppImage
      {...imageProps}
      src={src}
      alt={alt ?? 'Avatar'}
      style={avatarStyle}
      className={classNames(cls.Avatar, {}, [props.className,])}
      fallback={<Skeleton width={props.size} height={props.size} borderRadius="50%" />}
      errorFallback={
        <AppImage
          src={defaultAvatar}
          alt={alt ?? 'Avatar'}
          style={avatarStyle}
          className={avatarClassList}
        />
      }
    />
  );
};
