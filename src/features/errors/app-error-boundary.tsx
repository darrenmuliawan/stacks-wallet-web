import * as React from 'react';
import { Box, Button, CodeBlock, color, Stack } from '@stacks/ui';

import { useRouteHeader } from '@common/hooks/use-route-header';
import { Header } from '@components/header';
import { Prism } from '@common/clarity-prism';
import { Title } from '@components/typography';
import { ErrorBoundary, FallbackProps, useErrorHandler } from '@features/errors/error-boundary';
import { openGithubIssue } from '@features/errors/utils';
import { useErrorStackTraceState } from '@store/ui/ui.hooks';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const [value] = useErrorStackTraceState();

  useRouteHeader(<Header />);

  return (
    <Stack spacing="extra-loose" flexGrow={1}>
      <Title fontSize={3}>Something went wrong</Title>
      <Box className="error-codeblock" maxWidth="100vw" overflow="hidden">
        {value && (
          <CodeBlock
            maxWidth="100%"
            flexShrink={1}
            overflow="auto"
            maxHeight="305px"
            border="4px solid"
            borderColor={color('border')}
            borderRadius="12px"
            backgroundColor="ink.1000"
            width="100%"
            code={value as string}
            language="bash"
            Prism={Prism as any}
          />
        )}
      </Box>
      <Stack mt="auto" spacing="base">
        <Button onClick={resetErrorBoundary}>Reload extension</Button>
        <Button
          mode="tertiary"
          onClick={() => openGithubIssue({ message: error.message, stackTrace: value })}
        >
          Report issue on GitHub
        </Button>
      </Stack>
    </Stack>
  );
}

export const AppErrorBoundary: React.FC = ({ children }) => {
  const handleOnError = useErrorHandler();
  return (
    <ErrorBoundary
      onReset={() => {
        window.location.reload();
      }}
      FallbackComponent={ErrorFallback}
      onError={handleOnError}
    >
      {children}
    </ErrorBoundary>
  );
};
