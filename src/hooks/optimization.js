import { useEffect, useMemo, useState } from 'react';
import _debounce from 'lodash/debounce';

import { DEBOUNCE_TIME } from '@/utils/defaults';

const useDebounce = (callback) => {
  const debouncedCallback = useMemo(() => {
    return _.debounce(callback, DEBOUNCE_TIME);
  }, [callback]);

  return debouncedCallback;
};

const useFirstRender = () => {
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setFirstRender(true);
  }, []);

  return { firstRender };
};

export { useDebounce, useFirstRender };
