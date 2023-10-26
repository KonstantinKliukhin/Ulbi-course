interface AcceptableEvent {
  stopPropagation: () => void
}

export function stopPropagation<T extends AcceptableEvent> (handler?: (e: T) => void) {
  return function (e: T): void {
    e.stopPropagation();
    if (handler) handler(e);
  };
}
