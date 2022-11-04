package cseon.api.controller;

import cseon.api.dto.response.AccountDetailsRes;
import cseon.api.dto.response.BadgeResponseRes;
import cseon.api.service.AccountService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static cseon.common.utils.SecurityUtils.getCurrentUsername;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "MyPage", description = "계정 관리 API")
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/mypage")
    public ResponseEntity<AccountDetailsRes> showMyPage() {
        return ResponseEntity.ok(accountService.takeMyPage());
    }

    @GetMapping("/mypage/badge")
    public ResponseEntity<List<BadgeResponseRes>> getMyBadge() {
        // account 정보 가져오기
        return new ResponseEntity<>(accountService.getMyBadge(), HttpStatus.OK);
    }
}