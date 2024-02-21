import { COOKIE_CONFIGURATION_UPDATE } from 'src/plugin/cookie/cookie-configuration.plugin';

document.$emitter.subscribe(COOKIE_CONFIGURATION_UPDATE, eventCallback);

function eventCallback(updatedCookiesEvent) {
    this.cookieEnabledName = 'google-analytics-enabled';
    this.cookieAdsEnabledName = 'google-ads-enabled';

    const cookieObject = updatedCookiesEvent.detail;
    if (Object.keys(cookieObject).length === 0) {
        return;
    }

    const consentUpdateConfig = {};

    if (Object.prototype.hasOwnProperty.call(cookieObject, this.cookieEnabledName)) {
        consentUpdateConfig['analytics_storage'] = cookieObject[this.cookieEnabledName] ? 'granted' : 'denied';
    }

    if (Object.prototype.hasOwnProperty.call(cookieObject, this.cookieAdsEnabledName)) {
        consentUpdateConfig['ad_storage'] = cookieObject[this.cookieAdsEnabledName] ? 'granted' : 'denied';
        consentUpdateConfig['ad_user_data'] = cookieObject[this.cookieAdsEnabledName] ? 'granted' : 'denied';
        consentUpdateConfig['ad_personalization'] = cookieObject[this.cookieAdsEnabledName] ? 'granted' : 'denied';
    }

    if (Object.keys(consentUpdateConfig).length === 0) {
        return;
    }

    gtag('consent', 'update', consentUpdateConfig);
}
