export const selectFile = (): Promise<File> => {
  const input = document.createElement('input');
  input.style.display = 'none';
  input.type = 'file';
  input.name = 'file';
  input.multiple = false;
  input.click();

  return new Promise((resolve) => {
    const onChange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files[0];
      input.removeEventListener('change', onChange);
      input.remove();
      resolve(file);
    };

    input.addEventListener('change', onChange);
  });
};
