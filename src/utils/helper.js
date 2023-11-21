import _ from 'lodash';
import toast from 'react-hot-toast';

import { UNITS, THROTTLE } from './defaults';

const omitEmptyKeys = (obj, excludes = []) =>
  _.omitBy(obj, (value, key) => {
    return (
      !excludes.includes(key) &&
      (value === '' || value === undefined || value === null)
    );
  });

const omitNullishKeys = (obj, excludes = []) =>
  _.omitBy(obj, (value, key) => {
    return !excludes.includes(key) && !value;
  });

const pickExactObjKeys = (obj, pickObj) => _.pick(pickObj, Object.keys(obj));

const bytesFormat = (x) => {
  let index = 0;
  let value = parseInt(x, 10) || 0;

  while (value >= 1024 && ++index) {
    value = value / 1024;
  }

  return value.toFixed(value < 10 && index > 0 ? 1 : 0) + ' ' + UNITS[index];
};

const validateDropzoneSingleFile = (rejectedFiles, maxSize) => {
  const rejectedFile = rejectedFiles[0];
  if (rejectedFile) {
    const {
      errors: [{ code }],
      file: { name },
    } = rejectedFile;
    switch (code) {
      case 'file-too-large': {
        toast.error(`${name} is larger than ${bytesFormat(maxSize)}`);
        break;
      }
      default:
        break;
    }
  }
};

const getInitials = (str) => {
  const words = str.split(' ');
  const firstTwoLetters = words.map((word) => word.charAt(0)).slice(0, 2);
  const result = firstTwoLetters.join('');

  return result;
};

const createQueryString = (name, value, searchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};

const getShortDescription = (longDescription, maxLength = 50) => {
  if (longDescription.length <= maxLength) {
    return longDescription;
  } else {
    return `${longDescription.substring(0, maxLength)}...`;
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};

export {
  omitEmptyKeys,
  omitNullishKeys,
  pickExactObjKeys,
  validateDropzoneSingleFile,
  getInitials,
  createQueryString,
  getShortDescription,
  formatCurrency,
};
