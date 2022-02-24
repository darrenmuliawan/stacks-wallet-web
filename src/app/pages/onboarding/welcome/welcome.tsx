import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useWallet } from '@app/common/hooks/use-wallet';
import { useOnboardingState } from '@app/common/hooks/auth/use-onboarding-state';
import { Header } from '@app/components/header';
import { RouteUrls } from '@shared/route-urls';
import { useHasAllowedDiagnostics } from '@app/store/onboarding/onboarding.hooks';

import { WelcomeLayout } from './welcome.layout';
import { whenPageMode } from '@app/common/utils';
import { openNewTabWalletPage } from '@shared/utils/open-wallet-page';

export const WelcomePage = memo(() => {
  const [hasAllowedDiagnostics] = useHasAllowedDiagnostics();
  const navigate = useNavigate();
  const { makeWallet } = useWallet();
  const { decodedAuthRequest } = useOnboardingState();
  const analytics = useAnalytics();

  useRouteHeader(<Header hideActions />);

  const [isGeneratingWallet, setIsGeneratingWallet] = useState(false);

  const generateNewWallet = useCallback(async () => {
    setIsGeneratingWallet(true);
    await makeWallet();

    void analytics.track('generate_new_secret_key');

    if (decodedAuthRequest) {
      navigate(RouteUrls.SetPassword);
    }
    navigate(RouteUrls.BackUpSecretKey);
  }, [makeWallet, analytics, decodedAuthRequest, navigate]);

  const triggerOnboardingAction = useMemo(
    () =>
      whenPageMode({
        popup: () => void openNewTabWalletPage(),
        full: () => void generateNewWallet(),
      }),
    [generateNewWallet]
  );

  useEffect(() => {
    if (hasAllowedDiagnostics === undefined) navigate(RouteUrls.RequestDiagnostics);

    return () => setIsGeneratingWallet(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WelcomeLayout
      isGeneratingWallet={isGeneratingWallet}
      onStartOnboarding={triggerOnboardingAction}
      onRestoreWallet={() => navigate(RouteUrls.SignIn)}
    />
  );
});
