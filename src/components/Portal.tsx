import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(id: string) {
  const wrapper = document.createElement('div');
  wrapper.id = id;
  wrapper.style.position = 'relative';
  document.body.appendChild(wrapper);

  return wrapper;
}

type PortalProps = {
  children: React.ReactNode;
  wrapperId?: string;
};

export default function Portal({
  children,
  wrapperId = 'portal',
}: PortalProps) {
  let element = document.getElementById(wrapperId);
  // if element is not found with wrapperId,
  // create and append to body
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }

  element.style.position = 'relative';

  return createPortal(children, element);
}
