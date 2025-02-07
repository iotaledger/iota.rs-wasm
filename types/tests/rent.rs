// Copyright 2022 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

use iota_types::block::{
    output::{Output, Rent, RentStructure},
    protocol::protocol_parameters,
    rand::output::{rand_alias_output, rand_basic_output, rand_foundry_output, rand_nft_output},
};

const BYTE_COST: u32 = 1;
const FACTOR_KEY: u8 = 10;
const FACTOR_DATA: u8 = 1;

fn config() -> RentStructure {
    RentStructure::new(BYTE_COST, FACTOR_KEY, FACTOR_DATA)
}

fn output_in_range(output: Output, range: std::ops::RangeInclusive<u64>) {
    let cost = output.rent_cost(&config());
    assert!(
        range.contains(&cost),
        "{:#?} has a required byte cost of {}",
        output,
        cost
    );
}

#[test]
fn valid_rent_cost_range() {
    let token_supply = protocol_parameters().token_supply();

    output_in_range(Output::Alias(rand_alias_output(token_supply)), 445..=29_620);
    output_in_range(Output::Basic(rand_basic_output(token_supply)), 414..=13_485);
    output_in_range(Output::Foundry(rand_foundry_output(token_supply)), 496..=21_365);
    output_in_range(Output::Nft(rand_nft_output(token_supply)), 435..=21_734);
}
