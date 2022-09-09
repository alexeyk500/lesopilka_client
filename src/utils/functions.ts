export function clearFormAfterSubmit(myFormElement: HTMLFormElement) {
  const elements = myFormElement.elements;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] instanceof HTMLInputElement) {
      const input = elements[i] as HTMLInputElement;
      switch (input.type) {
        case 'text':
        case 'password':
        case 'textarea':
        case 'hidden':
          input.value = '';
          break;

        case 'radio':
        case 'checkbox':
          if (input.checked) {
            input.checked = false;
          }
          break;

        case 'select-one':
        case 'select-multi':
          (input as unknown as HTMLSelectElement).selectedIndex = -1;
          break;

        default:
          break;
      }
    }
  }
}
