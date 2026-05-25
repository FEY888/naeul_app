import 'dart:async';

import 'package:flutter/material.dart';
import 'package:naeul_app/common/const/colors.dart';
import 'package:naeul_app/home/model/blog_post_model.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeBlogSection extends StatefulWidget {
  const HomeBlogSection({super.key});

  @override
  State<HomeBlogSection> createState() => _HomeBlogSectionState();
}

class _HomeBlogSectionState extends State<HomeBlogSection> {
  late final PageController _pageController;
  late final Timer _timer;

  int _currentPage = 0;

  final List<BlogPostModel> posts = [
    BlogPostModel(
      id: '1',
      title: '안산 나을한의원 담적 증후군',
      thumbnailUrl: 'https://picsum.photos/200/160',
      date: '2026.05.18',
      url: 'https://m.blog.naver.com/naeul_hani/224238902384',
    ),
    BlogPostModel(
      id: '2',
      title: '교통사고 후유증 관리법',
      thumbnailUrl: 'https://picsum.photos/201/160',
      date: '2026.05.19',
      url: 'https://m.blog.naver.com/naeul_hani/123456',
    ),
    BlogPostModel(
      id: '3',
      title: '추나 치료',
      thumbnailUrl: 'https://picsum.photos/201/160',
      date: '2026.05.19',
      url: 'https://m.blog.naver.com/naeul_hani/223624364606',
    ),
  ];

  @override
  void initState() {
    super.initState();

    _pageController = PageController(
      initialPage: 0,
      viewportFraction: 0.85,
    );

    _timer = Timer.periodic(const Duration(seconds: 3), (Timer timer) {
      if (!mounted) return;

      if (_currentPage < posts.length - 1) {
        _currentPage++;
      } else {
        _currentPage = 0;
      }

      if (_pageController.hasClients) {
        _pageController.animateToPage(
          _currentPage,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SliverToBoxAdapter(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeader(),
          const SizedBox(height: 8),

          SizedBox(
            height: 220,
            child: PageView.builder(
              controller: _pageController,
              itemCount: posts.length,
              onPageChanged: (int index) {
                setState(() {
                  _currentPage = index;
                });
              },
              itemBuilder: (context, index) {
                final isSelected = _currentPage == index;

                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                  margin: EdgeInsets.only(
                    left: 8,
                    right: 8,
                    top: isSelected ? 0 : 20,
                    bottom: isSelected ? 0 : 20,
                  ),
                  child: _BlogCard(post: posts[index]),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 26),
      child: Text(
        '나을한의원 건강 소식',
        style: TextStyle(
          fontWeight: FontWeight.w700,
          fontSize: 22,
          color: brownColor,
        ),
      ),
    );
  }
}

class _BlogCard extends StatelessWidget {
  final BlogPostModel post;

  const _BlogCard({
    required this.post,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1A000000),
            blurRadius: 15,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () async {
              final uri = Uri.parse(post.url);

              if (await canLaunchUrl(uri)) {
                await launchUrl(
                  uri,
                  mode: LaunchMode.externalApplication,
                );
              }
            },
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,

              children: [
                Expanded(
                  flex: 7,
                  child: SizedBox(
                    width: double.infinity,
                    child: Image.network(
                      post.thumbnailUrl,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          color: Colors.grey[200],
                          child: const Center(
                            child: Icon(Icons.image_not_supported),
                          ),
                        );
                      },
                    ),
                  ),
                ),

                Expanded(
                  flex: 3,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(14, 3, 10, 3),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          post.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                            height: 1.1,
                            color: Color(0xFF2F3A2F),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          post.date,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: Colors.grey,
                            fontSize: 12,
                            height: 1.1,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}