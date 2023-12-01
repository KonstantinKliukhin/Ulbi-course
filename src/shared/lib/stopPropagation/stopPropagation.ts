interface AcceptableEvent {
  stopPropagation: () => void
}

export function stopPropagation<T extends AcceptableEvent> (argument?: ((e: T) => void) | T) {
  if (argument instanceof Function) {
    return function (e: T): void {
      e.stopPropagation();
      if (argument) argument(e);
    };
  } else if (argument) {
    argument.stopPropagation();
  }
}
