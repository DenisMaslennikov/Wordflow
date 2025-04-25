interface BaseImage {
  image: string;
  alt: string | null;
}

interface Image extends BaseImage {
  id: number;
}

export type { Image };
