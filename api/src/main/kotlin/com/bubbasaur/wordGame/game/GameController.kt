package com.bubbasaur.wordGame.game

import com.bubbasaur.wordGame.game.dto.CreateGameRequest
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path=["/games"])
@CrossOrigin(origins = ["http://localhost:3000"])
class GameController (
    private val gameService: GameService
) {
    @PostMapping
    fun createGame(@RequestBody request: CreateGameRequest): Game {
        return gameService.createGame(
            request.wordLength ?: 5,
            request.difficulty ?: 3,
            request.numberOfTries ?: 6)
    }
}