// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'date_reservation_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$timeRepositoryHash() => r'b1eb1318cbf8924d4ff671cbcd9318770b2d1722';

/// See also [timeRepository].
@ProviderFor(timeRepository)
final timeRepositoryProvider = AutoDisposeProvider<TimeRepository>.internal(
  timeRepository,
  name: r'timeRepositoryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$timeRepositoryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef TimeRepositoryRef = AutoDisposeProviderRef<TimeRepository>;
String _$timeSlotsHash() => r'7d285e97363d3ee013314b1e7c5b04d1638e1e6e';

/// See also [timeSlots].
@ProviderFor(timeSlots)
final timeSlotsProvider = AutoDisposeFutureProvider<List<TimeSlot>>.internal(
  timeSlots,
  name: r'timeSlotsProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$timeSlotsHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef TimeSlotsRef = AutoDisposeFutureProviderRef<List<TimeSlot>>;
String _$selectedDateHash() => r'ed1790a70c861b4c2fbee8a97e55b387bb2f0585';

/// See also [SelectedDate].
@ProviderFor(SelectedDate)
final selectedDateProvider =
    AutoDisposeNotifierProvider<SelectedDate, DateTime?>.internal(
  SelectedDate.new,
  name: r'selectedDateProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$selectedDateHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef _$SelectedDate = AutoDisposeNotifier<DateTime?>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
