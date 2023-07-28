import { getBreakpointValue, MantineSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useIsMobile(options?: { breakpoint: MantineSize }) {
  const theme = useMantineTheme();
  const { breakpoint = 'sm' } = options || {};
  console.log(breakpoint)
  console.log(getBreakpointValue('sm'))
  return useMediaQuery(`(max-width: ${getBreakpointValue(theme.breakpoints[breakpoint]) - 1}px)`, false, {
    getInitialValueInEffect: false,
  });
}
