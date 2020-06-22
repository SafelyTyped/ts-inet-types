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
    AppError,
    DEFAULT_DATA_PATH,
    THROW_THE_ERROR,
    TypeGuaranteeOptions,
} from "@safelytyped/core-types";

import { IpPort } from "./IpPort";
import { validateIpPortData } from "./validateIpPortData";

/**
 * `mustBeIpPort()` is a type guarantee. Use it to guarantee that the
 * given `input` can be safely used as a {@link IpPort}.
 *
 * @param input
 * the value to examime
 *
 * @category IpPort
 */
export function mustBeIpPort(
    input: unknown, {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH
    }: Partial<TypeGuaranteeOptions> = {}
): IpPort {
    // let's take a peek
    const retval = validateIpPortData(path, input);

    // did we like what we saw?
    if (retval instanceof AppError) {
        throw onError(retval);
    }

    // yes we did!
    return retval as IpPort;
}