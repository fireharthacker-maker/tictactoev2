import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6"
        >
          ← Back to Game
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h1>

          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">1. Information We Collect</h2>
              <p>
                We do not collect any personal information from users. This website is a simple tic-tac-toe game
                that runs entirely in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">2. Cookies</h2>
              <p>
                This website may use cookies for basic functionality and analytics. We use cookies to remember
                your game preferences and improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">3. Google AdSense</h2>
              <p className="mb-2">
                This website uses Google AdSense to display advertisements. Google AdSense uses cookies to serve
                ads based on your prior visits to this website or other websites.
              </p>
              <p className="mb-2">
                Google's use of advertising cookies enables it and its partners to serve ads to you based on your
                visit to this site and/or other sites on the Internet.
              </p>
              <p>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Ads Settings
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">4. Third-Party Cookies</h2>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits
                to this website. These cookies are used for analytics and advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">5. Analytics</h2>
              <p>
                We may use analytics tools to understand how visitors interact with our website. This helps us
                improve the user experience. These tools may use cookies to collect anonymous usage data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">6. Children's Privacy</h2>
              <p>
                This website does not knowingly collect any personal information from children under 13 years of age.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">7. Changes to Privacy Policy</h2>
              <p>
                We reserve the right to update this privacy policy at any time. Changes will be posted on this page
                with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-foreground">8. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through the website.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
