
import 'package:naeul_app/reservation/model/time_slot.dart';
import 'package:naeul_app/reservation/repository/time_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../data/time_mock_repository.dart';


part 'date_reservation_provider.g.dart';
@riverpod
class SelectedDate extends _$SelectedDate {
  DateTime? build() => null;

  void selectDate(DateTime date) {
    state = date;
  }
}

@riverpod
TimeRepository timeRepository(TimeRepositoryRef ref) {
  //서버 만들면 여기다 바꿔서 넣기
  return TimeMockRepository();
}

@riverpod
Future<List<TimeSlot>> timeSlots(TimeSlotsRef ref) async{
  final selectedDate = ref.watch(selectedDateProvider);
  if(selectedDate == null) return [];

  final repository = ref.watch(timeRepositoryProvider);
  return repository.getAvailableSlots(selectedDate);
}