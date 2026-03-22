declare module 'lucide-react/dist/esm/icons/*' {
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends Partial<SVGProps<SVGSVGElement>> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  const Icon: FC<LucideProps & Record<string, any>>;
  export default Icon;
}
