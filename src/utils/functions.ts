import { FilterType, OptionsType } from '../types/types';

export const regExpForPrice = /^\d*\.?(?:\d{1,2})?$/;
// export const regExpForPrice = /^\d*[.,]?(?:\d{1,2})?$/

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

export const getOptionsWithFirstEmptyOption = (optionsStore: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
  return options;
};

export const getInputFormData = (form: HTMLFormElement, name: string): string => {
  const element = form.elements.namedItem(name);
  if (element instanceof HTMLInputElement) {
    return element.value;
  }
  return '';
};

export const getValueFromFilter = (filters: FilterType[], title: string) => {
  const index = filters.findIndex((filter) => filter.title === title);
  if (index > -1) {
    return filters[index].value;
  }
  return undefined;
};

export const getOptionTitle = (options: OptionsType[], optionId: number | undefined) => {
  if (optionId) {
    const option = options.find((option) => option.id === optionId);
    if (option?.title) {
      return option.title;
    }
  }
  return undefined;
};
