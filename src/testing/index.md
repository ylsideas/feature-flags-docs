# Testing

## Test Fake

There is a simple Features Fake that can be used when writing tests. You can do so by simply listing the
feature you wish to be faked.

```php
Features::fake(['my-feature' => true])
```

If you know a feature will be called multiple times that you wish to change the state of during the test you
can supply and array of values which will be used.

```php
Features::fake(['my-feature' => [true, false, true]])
```

There are then also assertions that can be used to check if a feature was or was not accessed and how many
times it was accessed during the test.

```php
Features::assertAccessed('my-feature');
Features::assertAccessedCount('my-feature', 2);
Features::assertNotAccessed('my-feature');
```

If you are using the service container to resolve the `Features` class you must inject the service using the
`Accessibles` contract.

```php
public function get(\YlsIdeas\FeatureFlags\Contracts\Features $features)
{
    $features->accessible('my-feature');
}
```