# Design patterns used

## Access Control Design Patterns

two function like `pay` and `deposit` just need to call with every body.because every body should can make his contract (pay) and can get the work or service (deposit)(but in deposit need to be status in nostarted)


in functions like `confirm` and `withdrawEmployer` just work with employer.when work is done function `confirm` will activated and when work not complete or failed `withdrawEmployer` active.

in function like `judgment` just work with judgement person.it just active when employer and worker can not accept the result.

in function `withdrawWorker` just active when judgement or employer accept the result of his work.

## Inheritance and Interfaces

we don't need to library ecause write all them with mineself.and time project is near to out.