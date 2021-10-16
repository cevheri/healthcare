import * as visit_component from "./visit.component"
import * as visit_service from "./visit.service"

describe("loadPage", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new visit_service.VisitService(undefined)
        inst2 = new visit_component.VisitComponent(inst, undefined, undefined, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst2.loadPage(64)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst2.loadPage(256)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst2.loadPage(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst2.loadPage(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst2.loadPage(32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst2.loadPage(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

describe("ngOnInit", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new visit_service.VisitService(undefined)
        inst2 = new visit_component.VisitComponent(inst, undefined, undefined, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst2.ngOnInit()
        }
    
        expect(callFunction).not.toThrow()
    })
})

describe("ngOnDestroy", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new visit_service.VisitService(undefined)
        inst2 = new visit_component.VisitComponent(inst, undefined, undefined, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst2.ngOnDestroy()
        }
    
        expect(callFunction).not.toThrow()
    })
})

describe("registerChangeInVisits", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new visit_service.VisitService(undefined)
        inst2 = new visit_component.VisitComponent(inst, undefined, undefined, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst2.registerChangeInVisits()
        }
    
        expect(callFunction).not.toThrow()
    })
})

describe("sort", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new visit_service.VisitService(undefined)
        inst2 = new visit_component.VisitComponent(inst, undefined, undefined, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst2.sort()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onError", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new visit_service.VisitService(undefined)
        inst2 = new visit_component.VisitComponent(inst, undefined, undefined, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst2.onError()
        }
    
        expect(callFunction).not.toThrow()
    })
})
