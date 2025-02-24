import { Box, Stack } from '@stacks/ui';

import { Caption } from '@app/components/typography';
import { NoActivityIllustration } from '@app/components/vector/no-activity';

export function NoData() {
  return (
    <Stack py="extra-loose" spacing="extra-loose" justifyContent="center" alignItems="center">
      <Box mx="auto">
        <NoActivityIllustration />
      </Box>

      <Caption maxWidth="23ch" textAlign="center">
        No data yet.
      </Caption>
    </Stack>
  );
}
