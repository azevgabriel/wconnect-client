export const getValuesOnFormSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  return new FormData(form);
};
