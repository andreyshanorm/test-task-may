import { memo } from "react";
import styled from "styled-components";
import type { IImageProps } from "./Image.props";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 800px;
  max-height: 60vh;
  overflow: hidden;
`;

const Img = styled.img.attrs({
  loading: "lazy",
})<Omit<IImageProps, "imageSrc" | "altText">>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  object-fit: "cover";
  transition: opacity 0.3s ease;
`;

const Image = ({
  width,
  height,
  imageSrc,
  altText = "Изображение",
  ...rest
}: IImageProps) => {
  return (
    <Wrapper {...rest}>
      <Img width={width} height={height} src={imageSrc} alt={altText} />
    </Wrapper>
  );
};

export default memo(Image);
