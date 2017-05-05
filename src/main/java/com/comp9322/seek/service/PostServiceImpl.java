package com.comp9322.seek.service;

import com.comp9322.seek.model.Post;
import com.comp9322.seek.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Post findOnePostById(Long id) {
        return postRepository.findOnePostById(id);
    }

    public void save(Post post) {
        postRepository.save(post);
    }

    public void deletePostById(Long id) {
        postRepository.delete(id);
    }

}
