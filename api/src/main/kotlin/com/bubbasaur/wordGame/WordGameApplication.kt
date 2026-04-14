package com.bubbasaur.wordGame

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WordGameApplication

fun main(args: Array<String>) {
	runApplication<WordGameApplication>(*args)
}
