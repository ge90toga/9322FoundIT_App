package com.comp9322.seek.service;


import com.comp9322.seek.model.Post;

import java.util.List;


public interface PostService {
    List<Post> findAll();
    Post findOnePostById(Long id);
    void save(Post post);
    void deletePostById(Long id);
}
