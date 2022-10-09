# Usage

## Checking feature accessibility

You can use the accessible method to check if a feature is on or off.

```php
Features::accessible('my-feature') // returns true or false
```

## Blade Views

the `@feature` blade directive is a simple `@if` shortcut to hide or display certain parts of the view
depending on the state of the feature. A second argument flips the state e.g. it will display the contents
of the if statement, if the feature is off.

```php
@feature('my-feature')
    <p>Your feature flag is turned on.</p>
@endfeature

@feature('my-feature', false)
    <p>Your feature flag is turned off.</p>
@endfeature
```

## Routing Middleware

The middleware will cause routes to be blocked if the specified feature does not have the correct state.

```php
Route::get('/', 'SomeController@get')->middleware('feature:my-feature')
Route::get('/', 'SomeController@get')->middleware('feature:my-feature,on')
Route::get('/', 'SomeController@get')->middleware('feature:my-feature,off,404')
```

## Validation Rules

Fields can be marked as required depending on if the feature is in a particular state.

```php
Validator::make([
    'name' => 'Peter',
    'place' => 'England',
    'email' => 'peter.fox@ylsideas.co',
], [
    'name' => 'requiredWithFeature:my-feature', // required
    'place' => 'requiredWithFeature:my-feature,on', // required
    'email' => 'requiredWithFeature:my-feature,off', // not required
]);
```

## Task Scheduling

Using the following will determine if a task will run on schedule depending on the state of the
feature.

```php
$schedule->command('emails:send Peter --force')
    ->skipWithFeature('my-feature')
    
$schedule->command('emails:send Peter --force')
    ->skipWithoutFeature('my-other-feature')    
```

## Artisan Commands

You may run the following commands to toggle the on or off state of the feature.

```bash
php artisan feature:on <gateway> <feature>

php artisan feature:off <gateway> <feature>
```