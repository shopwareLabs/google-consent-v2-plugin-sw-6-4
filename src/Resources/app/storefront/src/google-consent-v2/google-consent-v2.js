import { COOKIE_CONFIGURATION_UPDATE } from 'src/plugin/cookie/cookie-configuration.plugin';

document.$emitter.subscribe(COOKIE_CONFIGURATION_UPDATE, eventCallback);

function eventCallback(updatedCookies) {
    this.cookieEnabledName = 'google-analytics-enabled';
    this.cookieAdsEnabledName = 'google-ads-enabled';

    if (Object.keys(updatedCookies).length === 0) {
        return;
    }

    const consentUpdateConfig = {};

    if (Object.prototype.hasOwnProperty.call(updatedCookies, this.cookieEnabledName)) {
        consentUpdateConfig['analytics_storage'] = updatedCookies[this.cookieEnabledName] ? 'granted' : 'denied';
    }

    if (Object.prototype.hasOwnProperty.call(updatedCookies, this.cookieAdsEnabledName)) {
        consentUpdateConfig['ad_storage'] = updatedCookies[this.cookieAdsEnabledName] ? 'granted' : 'denied';
        consentUpdateConfig['ad_user_data'] = updatedCookies[this.cookieAdsEnabledName] ? 'granted' : 'denied';
        consentUpdateConfig['ad_personalization'] = updatedCookies[this.cookieAdsEnabledName] ? 'granted' : 'denied';
    }

    if (Object.keys(consentUpdateConfig).length === 0) {
        return;
    }

    gtag('consent', 'update', consentUpdateConfig);
}
