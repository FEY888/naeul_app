import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:naeul_app/common/const/colors.dart';
import 'package:naeul_app/home/data/clinic_grid_data.dart';






class HomeClinicGridGrid extends StatelessWidget {
  const HomeClinicGridGrid({super.key});

  @override
  Widget build(BuildContext context) {
    final clinics = ClinicGridData.clinicModel;

    return SliverMainAxisGroup(
      slivers: [

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 40, 16, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Padding(
                  padding:EdgeInsets.only(left: 10,),
                  child: const Text(
                    '진료 과목',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                      color: brownColor,

                    ),
                  ),
                ),
                GestureDetector(
                  onTap: () {},
                  child: Row(
                    children: [
                      Text(
                        '전체 보기',
                        style: TextStyle(color: Colors.grey, fontSize: 14),
                      ),
                      Icon(
                        Icons.chevron_right,
                        color: Colors.grey,
                        size: 20,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          sliver: SliverMasonryGrid.count(
            crossAxisCount: 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,

            itemBuilder: (context, index) {
              final clinic = clinics[index];
              final bool isTallCard = clinic.cardHeight > 110;

              return Container(
                height: clinic.cardHeight,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: clinic.bgColor,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.2),
                    width: 1,
                  ),
                  boxShadow: [
                    isTallCard ? AppBoxShadows.deep : AppBoxShadows.soft,
                  ],
                ),
                padding: const EdgeInsets.all(16),
                child: Stack(
                  children: [
                    Align(
                      alignment: Alignment.topCenter,
                      child: Text(
                        clinic.title,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                          height: 2.44,
                        ),
                      ),
                    ),
                    Align(
                      alignment: Alignment.bottomRight,
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.5),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          clinic.icon,
                          color: Colors.white.withValues(alpha: 0.9),
                          size: 24,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
            childCount: clinics.length,
          ),
        ),
      ],
    );
  }
}
