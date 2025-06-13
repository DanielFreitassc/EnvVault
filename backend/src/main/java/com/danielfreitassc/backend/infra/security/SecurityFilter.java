package com.danielfreitassc.backend.infra.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.danielfreitassc.backend.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String path = request.getServletPath();
            boolean isPublicEndpoint = (path.equals("/users") && request.getMethod().equals("POST")) || path.equals("/validation") || path.equals("/auth/login") && request.getMethod().equals("POST");

            var token = this.recoverToken(request);

            // Se o token for nulo e o endpoint não exigir autenticação, apenas continue a requisição
            if (token == null) {
            if (isPublicEndpoint) {
                filterChain.doFilter(request, response);
            } else {
                customAuthenticationEntryPoint.commence(request, response, null); 
            }
            return;
            }

            var username = tokenService.validateToken(token);
            UserDetails user = userRepository.findByUsername(username);

            if (user != null) {
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            // Encaminha a exceção para o CustomAuthenticationEntryPoint
            customAuthenticationEntryPoint.commence(request, response, null);
        }
    }
    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}