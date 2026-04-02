import type { RobotSpec } from '../../types/RobotSpec';
import { formatPrice } from '../../logic/formatters';

interface ProductHeaderProps {
  spec: RobotSpec;
  hidden: boolean;
}

export function ProductHeader({ spec, hidden }: ProductHeaderProps) {
  return (
    <div
      className="compare-cell"
      data-product={spec.slug}
      data-hidden={hidden ? 'true' : 'false'}
    >
      <img
        className="product-img"
        src={spec.image}
        alt={`${spec.brand} ${spec.model}`}
        loading="lazy"
      />
      <span className="product-brand">{spec.brand}</span>
      <span className="product-name">{spec.model}</span>
      <span className="product-price">{formatPrice(spec.price_usd)}</span>
    </div>
  );
}
