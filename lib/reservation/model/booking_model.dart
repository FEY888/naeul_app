

enum TreatmentCategory {
  carAccident,
  stomach,
  diet,
  pain,
  women,
  consultation,
}

class BookingModel {
  final TreatmentCategory category;
  final String title;
  final String description;
  final String emoji;

  BookingModel({
   required this.category,
    required this.title,
   required this.description,
   required this.emoji,
});
}