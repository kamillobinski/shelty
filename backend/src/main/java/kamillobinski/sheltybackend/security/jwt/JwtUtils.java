package kamillobinski.sheltybackend.security.jwt;

import kamillobinski.sheltybackend.security.services.UserDetailsImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.*;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // Defined in application.yml file.
    @Value("${jwt.jwtSecret}")
    private String jwtSecret;

    // Defined in application.yml file.
    @Value("${jwt.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("JSON Web Token has invalid signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("JSON Web Token is invalid: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JSON Web Token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JSON Web Token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JSON Web Token claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
