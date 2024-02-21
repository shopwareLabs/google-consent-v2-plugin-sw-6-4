<?php declare(strict_types=1);

namespace BrocksiNet\Framework\Cookie;

use Shopware\Storefront\Framework\Cookie\CookieProviderInterface;

class GoogleConsentV2CookieProvider implements CookieProviderInterface {

    private CookieProviderInterface $originalService;

    public function __construct(CookieProviderInterface $service)
    {
        $this->originalService = $service;
    }

    private const MARKETING_COOKIES = [
        'snippet_name' => 'cookie.groupMarketing',
        'snippet_description' => 'cookie.groupMarketingDescription',
        'entries' => [
            [
                'snippet_name' => 'cookie.groupMarketingAdConsent',
                'cookie' => 'google-ads-enabled',
                'expiration' => '30',
                'value' => '1',
            ],
        ],
    ];

    public function getCookieGroups(): array
    {
        return array_merge(
            $this->originalService->getCookieGroups(),
            [
                self::MARKETING_COOKIES,
            ]
        );
    }
}
