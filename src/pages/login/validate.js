export function validate(input) {
  if (
    input.getAttribute('type') === 'email'
    || input.getAttribute('name') === 'email'
  ) {
    if (
      input.value
        .trim()
        .match(
          /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9_\-.]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
        ) == null
    ) {
      return false;
    }
  }
  if (
    input.getAttribute('type') === 'password'
    || input.getAttribute('name') === 'pass'
  ) {
    if (
      !input.value
        .trim()
        .match(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:[\]{}])[0-9a-zA-Z+\-_@$!%*?&#.,;:[\]{}]{8,}/g,
        )
    ) {
      return false;
    }
  } else if (input.value.trim() === '') {
    return false;
  }
  return true;
}

export function showValidate(input) {
  const thisAlert = input.parentElement;
  thisAlert.classList.add('alert-validate');
}

export function hideValidate(input) {
  const thisAlert = input.target.parentElement;
  thisAlert.classList.remove('alert-validate');
}
