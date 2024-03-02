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
import {
    type AppErrorOr,
    type DataPath,
    UnsupportedTypeError,
    validate,
    validateInteger,
    validateNumberRange,
} from "@safelytyped/core-types";

import { MAX_IP_PORT } from "./constants/MAX_IP_PORT";
import { MIN_IP_PORT } from "./constants/MIN_IP_PORT";
import type { IpPort } from "./IpPort";
import { resolveIpPortToNumber } from "./resolveIpPortToNumber";
import type { ValidateIpPortDataOptions } from "./ValidateIpPortDataOptions";

/**
 * `validateIpPortData()` is a data validator. Use it to prove that your
 * input value can be used as an IP port.
 *
 * @param path
 * where are you in the nested data structure that you're validating?
 * Use {@link DEFAULT_DATA_PATH} if you're not in a nested data structure.
 * @param input
 * The value to validate.
 * @param minInc
 * The lowest number IP port that's acceptable. Defaults to
 * {@link MIN_IP_PORT}. Override this if you are creating a refined type.
 * @param maxInc
 * The highest number IP port that's acceptable. Defaults to
 * {@link MAX_IP_PORT}. Override this if you are creating a refined type.
 * @returns
 * - `input`, type-cast to be an {@link IpPort}, on success, or
 * - an AppError explaining why validation failed
 *
 * @category IpPort
 */
export function validateIpPortData(
    path: DataPath,
    input: unknown,
    {
        minInc = MIN_IP_PORT,
        maxInc = MAX_IP_PORT
    }: Partial<ValidateIpPortDataOptions> = {}
): AppErrorOr<IpPort> {
    // not worth using a function pointer table here,
    // because there's only 3 options
    switch (typeof input) {
        case "number":
            return validateIpPortNumber(path, input, minInc, maxInc);
        case "string":
            return validateIpPortString(path, input, minInc, maxInc);
        default:
            return new UnsupportedTypeError({
                public: {
                    dataPath: path,
                    expected: "string|number",
                    actual: typeof input
                }
            });
    }
}

function validateIpPortNumber(
    path: DataPath,
    input: number,
    minInc: number,
    maxInc: number,
): AppErrorOr<IpPort> {
    return validate(input)
        .next((x) => validateInteger(x, { path }))
        .next((x) => validateNumberRange(x, minInc, maxInc, { path }))
        .next(() => input as IpPort)
        .value();
}

function validateIpPortString(
    path: DataPath,
    input: string,
    minInc: number,
    maxInc: number,
): AppErrorOr<IpPort> {
    return validate(input)
        .next((x) => resolveIpPortToNumber(x as IpPort))
        .next((x) => validateIpPortNumber(path, x, minInc, maxInc))
        .next(() => input as IpPort)
        .value();
}
