package com.Interviee.demo.service;


import com.Interviee.demo.model.BlogPost;

import java.util.List;

public interface BlogPostService {
    BlogPost createPost(BlogPost post);
    List<BlogPost> getAllPosts();
    BlogPost getPostById(Long id);
    List<BlogPost> filterPosts(String company, String role, String branch);
    boolean incrementLike(Long postId);
}
