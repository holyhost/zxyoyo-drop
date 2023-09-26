import {
  Anchor,
  Button,
  ButtonProps,
  Code,
  createStyles,
  Footer,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useDebouncedState, useWindowEvent } from '@mantine/hooks';
import { useState } from 'react';
// import { env } from '~/env/client.mjs';
import { useIsMobile } from '@/hooks/useIsMobile';
// import { useFeatureFlags } from '~/providers/FeatureFlagsProvider';
import { getScrollPosition } from '@/utils/window-helpers';
import Link from 'next/link';

const buttonProps: ButtonProps = {
  size: 'xs',
  variant: 'subtle',
  color: 'gray',
};

const hash = "zxyoyo_123456";

export function AppFooter() {
  const { classes, cx } = useStyles();
  const [showHash, setShowHash] = useState(false);
  const [showFooter, setShowFooter] = useDebouncedState(true, 200);
  const mobile = useIsMobile();
  // const features = useFeatureFlags();

  useWindowEvent('scroll', () => {
    const scroll = getScrollPosition();
    setShowFooter(scroll.y < 10);
  });

  return (
    <Footer className={cx(classes.root, { [classes.down]: !showFooter })} height="auto" p="sm">
      <Group spacing={mobile ? 'sm' : 'lg'} sx={{ flexWrap: 'nowrap' }}>
        <Text
          weight={700}
          sx={{ whiteSpace: 'nowrap', userSelect: 'none' }}
          onDoubleClick={() => {
            if (hash) setShowHash((x) => !x);
          }}
        >
          &copy; ZXYOYO {new Date().getFullYear()}
        </Text>
        {showHash && hash && (
          <Stack spacing={2}>
            <Text weight={500} size="xs" sx={{ lineHeight: 1.1 }}>
              Site Version
            </Text>
            <Anchor
              target="_blank"
              href={`/github/commit/${hash}`}
              w="100%"
              sx={{ '&:hover': { textDecoration: 'none' } }}
            >
              <Code sx={{ textAlign: 'center', lineHeight: 1.1, display: 'block' }}>
                {hash.substring(0, 7)}
              </Code>
            </Anchor>
          </Stack>
        )}
        <Group spacing={0} sx={{ flexWrap: 'nowrap' }}>
          <Button
            component={Link}
            href="/pricing"
            {...buttonProps}
            variant="subtle"
            color="pink"
            px={mobile ? 5 : 'xs'}
          >
            Support Us ❤️
          </Button>
          <Button
            component={Link}
            href="/content/careers"
            {...buttonProps}
            variant="subtle"
            color="green"
            px={mobile ? 5 : 'xs'}
          >
            Join Us 💼
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/content/tos"
            {...buttonProps}
            px={mobile ? 5 : 'xs'}
          >
            Terms of Service
          </Button>
          <Button
            component={Link}
            prefetch={false}
            href="/content/privacy"
            {...buttonProps}
            px={mobile ? 5 : 'xs'}
          >
            Privacy
          </Button>
          <Button component="a" href="https://github.com/holyhost/myworld" {...buttonProps} target="_blank">
            GitHub
          </Button>

          <Button
            component="a"
            href="/github/wiki/REST-API-Reference"
            {...buttonProps}
            target="_blank"
          >
            API
          </Button>
          <Button component="a" href="https://status.zxyoyo.com" {...buttonProps} target="_blank">
            Status
          </Button>
        </Group>
        <Group ml="auto" spacing={4} sx={{ flexWrap: 'nowrap' }}>
          <Button component="a" href="/bugs" {...buttonProps} target="_blank" pl={4} pr="xs">
            🪲 Bugs
          </Button>
          <Button
            component="a"
            href="/feedback"
            variant="light"
            color="yellow"
            target="_blank"
            pl={4}
            pr="xs"
          >
            💡 Ideas
          </Button>
        </Group>
      </Group>
    </Footer>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    // boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.05), 0 -1px 2px rgba(0, 0, 0, 0.1)',
    transitionProperty: 'transform',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'linear',
    overflowX: 'auto',
    // transform: 'translateY(0)',
  },
  down: {
    transform: 'translateY(200%)',
    // bottom: '-60',
  },
}));
