//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { AppErrorOr, NumberOutOfRangeError, UnsupportedTypeError } from "@safelytyped/core-types";
import { expect } from "chai";
import { describe } from "mocha";

import { MAX_IP_PORT } from "./constants/MAX_IP_PORT";
import { MIN_IP_PORT } from "./constants/MIN_IP_PORT";
import { mustBeIpPort } from "./mustBeIpPort";


describe("mustBeIpPort()", () => {
    describe("with numbers", () => {
        it("accepts integers between " + MIN_IP_PORT + " and " + MAX_IP_PORT + " inclusive", () => {
            for(let i = MIN_IP_PORT; i <= MAX_IP_PORT; i++) {
                const actualValue = mustBeIpPort(i);
                expect(actualValue).to.equal(
                    i,
                    "rejected input value " + JSON.stringify(i)
                );
            }
        });

        it("rejects integers below 0", () => {
            for(let i = MIN_IP_PORT - 100; i < MIN_IP_PORT; i++) {
                let actualValue: AppErrorOr<any> = false;
                try {
                    actualValue = mustBeIpPort(i);
                } catch(e) {
                    actualValue = e;
                }
                expect(actualValue).to.be.instanceOf(
                    NumberOutOfRangeError,
                    "did not reject input value " + JSON.stringify(i)
                );
            }
        });

        it("rejects integers above 65535", () => {
            for(let i = MAX_IP_PORT + 1; i < MAX_IP_PORT + 100; i++) {
                let actualValue: AppErrorOr<any> = false;
                try {
                    actualValue = mustBeIpPort(i);
                } catch(e) {
                    actualValue = e;
                }
                expect(actualValue).to.be.instanceOf(
                    NumberOutOfRangeError,
                    "did not reject input value " + JSON.stringify(i)
                );
            }
        });

        it("rejects non-integers", () => {
            let actualValue: AppErrorOr<any> = false;
            try {
                actualValue = mustBeIpPort(MIN_IP_PORT + 1.5);
            } catch(e) {
                actualValue = e;
            }
            expect(actualValue).to.be.instanceOf(
                UnsupportedTypeError,
            );
        });
    });

    describe("with strings", () => {
        it("accepts integers between 0 and 65535 inclusive", () => {
            for(let i = MIN_IP_PORT; i <= MAX_IP_PORT; i++) {
                const inputValue = i.toString();

                const actualValue = mustBeIpPort(inputValue);
                expect(actualValue).to.equal(
                    inputValue,
                    "rejected input value " + JSON.stringify(inputValue)
                );
            }
        });

        it("rejects integers below 0", () => {
            for(let i = MIN_IP_PORT - 100; i < MIN_IP_PORT; i++) {
                const inputValue = i.toString();

                let actualValue: AppErrorOr<any> = false;
                try {
                    actualValue = mustBeIpPort(inputValue);
                } catch(e) {
                    actualValue = e;
                }
                expect(actualValue).to.be.instanceOf(
                    NumberOutOfRangeError,
                    "did not reject input value " + JSON.stringify(inputValue)
                );
            }
        });

        it("rejects integers above 65535", () => {
            for(let i = MAX_IP_PORT + 1; i < MAX_IP_PORT + 100; i++) {
                const inputValue = i.toString();

                let actualValue: AppErrorOr<any> = false;
                try {
                    actualValue = mustBeIpPort(inputValue);
                } catch(e) {
                    actualValue = e;
                }
                expect(actualValue).to.be.instanceOf(
                    NumberOutOfRangeError,
                    "did not reject input value " + JSON.stringify(inputValue)
                );
            }
        });

        it("rejects non-integers", () => {
            let actualValue: AppErrorOr<any> = false;
            try {
                actualValue = mustBeIpPort(
                    (MIN_IP_PORT + 1.5).toString()
                );
            } catch(e) {
                actualValue = e;
            }

            expect(actualValue).to.be.instanceOf(
                UnsupportedTypeError,
            );
        });
    });

    describe("other input types are rejected", () => {
        it("rejects other input types", () => {
            let actualValue: AppErrorOr<any> = false;
            try {
                actualValue = mustBeIpPort(null);
            } catch(e) {
                actualValue = e;
            }

            expect(actualValue).to.be.instanceOf(UnsupportedTypeError);
        });
    });
});