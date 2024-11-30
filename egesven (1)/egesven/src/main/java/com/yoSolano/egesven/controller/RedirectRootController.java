package com.yoSolano.egesven.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectRootController {

    @GetMapping("/")
    public String redirigirARutaAuth() {
        return "redirect:/auth";
    }
}