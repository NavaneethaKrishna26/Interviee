package com.Interviee.demo.service;

import com.Interviee.demo.model.BlogPost;
import com.Interviee.demo.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;
@Service
public class BlogPostServiceImpl implements BlogPostService {

    @Autowired
    private BlogPostRepository repository;

    @Override
    public BlogPost createPost(BlogPost post) {
        return repository.save(post);
    }

    @Override
    public List<BlogPost> getAllPosts() {
        return repository.findAll();
    }

    @Override
    public BlogPost getPostById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<BlogPost> filterPosts(String company, String role, String branch) {
        return repository.filterPosts(company, role, branch);
    }
    @Override
    public boolean incrementLike(Long postId) {
        Optional<BlogPost> postOpt = repository.findById(postId);
        if (postOpt.isPresent()) {
            BlogPost post = postOpt.get();
            post.setLikeCount(post.getLikeCount() + 1);
            repository.save(post);
            return true;
        }
        return false;
    }

}
