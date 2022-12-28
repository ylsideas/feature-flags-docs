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

## Query Builder

A useful extension of this package is also in being able to decide if part of a query should occur if a feature is
enabled or disabled.

```php
$results = DB::table('users')
    ->whenFeatureIsAccessible('my-feature', function (Builder $query) {
        return $query->where('type', 'new');
    })
    ->whenFeatureIsNotAccessible('my-feature', function (Builder $query) {
        return $query->where('type', 'old');
    })
    ->get();
```

## Cleaning up Features

Often when working with feature flags you will want to remove flags frequently but aren't clear where
such flags are referenced within the application you're developing. To help with this you can then
add a list of features that you have expired. When these features are accessed, an exception will be thrown.

This is useful when used in conjunction with a test suit.

```php
Features::callOnExpiredFeatures([
    'my-feature',
])
```

You may also customise this and provide your own callback if you wish to.

```php
Features::callOnExpiredFeatures([
    'my-feature',
], function (string $feature): void {
    logger()->debug('Expired Feature!', ['feature' => $feature]);
})
```

You can even implement your own `ExpiredFeaturesHandler` which decides how a feature is expired etc.

```php
Features::applyOnExpiredHandler(new CustomExpiredFeaturesHandler));
```

## Artisan Commands

You may run the following commands to toggle the on or off state of the feature.

```bash
php artisan feature:on <gateway> <feature>

php artisan feature:off <gateway> <feature>
```

## Debugging Flag access

If you wish to see what features are being accessed during a request you can enable the debug mode.

```php
Features::configureDebugging();
```

Then using an event listener you can use the ActionDebugLog to inspect how the decision was made, such as
which gateway responded or if it came from the cache.

```php
\Illuminate\Support\Facades\Event::listen(
    \YlsIdeas\FeatureFlags\Events\FeatureAccessed::class, 
    function (\YlsIdeas\FeatureFlags\Events\FeatureAccessed $event) {
        $event->log->file; // the file that accessed the feature
        $event->log->line; // the line of the file that accessed the feature
        // the decisions made by each gateway in order of access
        // e.g. [
        //  ['pipe' => 'redis', 'reason' => ActionDebugLog::REASON_NO_RESULT, 'result' => false],
        //  ['pipe' => 'database', 'reason' => ActionDebugLog::REASON_RESULT, 'result' => true],
        // ]
        $event->log->decisions;
    }
);
```

Logging this information can then help you if you're finding that a feature is not behaving as expected.