# Kirby Style Guide

This project using:

- clean code principle
- functional programming

## Code Style Guide

- Pure Function (decoupling)

- Data Should be last (lazy execution)

- Partial Application (composition)

- Pipable Structure (data execution flow)

- Pointer free program (program as a stream)

## Project Structure

- `index.ts`: program entry point

- `question*.ts`: usecases (aka. business logic)
- `service.ts`: api interfaces

- `utils.ts`: utilities, which are the basic units for building program.
- `constants.ts`: static constants 

- `types.ts`: entities, models

## `question*` `service` - usecase

- should be only includes `abstraction` and `domain logic` without any implement detail.

- should be standalone without any influenced by another `questions`.

- any side effect should be executed `first` or `last`.

- any data should be wrapped as `monad` which handle error occured.

- `business modal` should be composed here by `usecase`.

- `data processing` (aka. usecase) should be composed at here.

- `data processing` should look like a stream, and exactly a stream.

- `input, output, data flow` should be clean and clear without jumping.

## `utils` - data processing unit

- any data should be wrapped as `monad` which handle error occured.

- should be decoupling with pure function.

- should be predictable, for any A should be return same result B.

- should be obviously, function as abstraction.

- should be clear, type and data should be assertable.

- should be clean, only export necessary.

## `types` - modal

- should be zero dependencies.

- should be as simple as possible, which can be composed by `usecase`.

- prefer `has` not `is` strategy.

- any possible value should be assertable in compiled time, not runtime.
