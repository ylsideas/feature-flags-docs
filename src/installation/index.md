# Installation

## Using Composer

You can install the package via composer:

```bash
composer require ylsideas/feature-flags:^2.0
```

Once installed you should publish the config with the following command.

```bash
php artisan vendor:publish --provider="YlsIdeas\FeatureFlags\FeatureFlagsServiceProvider" --tag=config
```

You can customise the `features.php` config in a number of ways.