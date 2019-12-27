import { BaseModel } from '../libs/base.model';

export class ProspectingSteps extends BaseModel {
    constructor(
        public position?: number,
        public name?: string,
        public description?: string,
        public pointA?: string,
        public tools?: string,
        public pointB?: string
    ) { super('ProspectingSteps'); }

    static getDefaultSteps(): ProspectingSteps[] {
        return <ProspectingSteps[]>[
            new ProspectingSteps(
                0,
                "DISCOVERING PARTNER",
                `Discover their initial mindset and learn their
                    dream. Discover whether or not they are willing
                    to work at their dream. Discuss your goals and
                    dreams and the doors opened that will allow you
                    to attain them.`,
                `Prospect meets you for
                    the first time. Has no
                    previous interaction.`,
                'Business card',
                `Prospect thinks you're a
                    great conversationallist
                    and is excited about their
                    dream. Prospect wants
                    to talk about potential to
                    meet people who can
                    help them get their
                    dream.`
            ),
            new ProspectingSteps(
                1,
                "MEET AND GREET 1",
                `Get to know the potential partners. Expand on
                    their dream and flesh it out. Develop relationship
                    and trust. Share dialog your coach had with you
                    in form of questions to identify the person's
                    mindset
                    Homework - Read book if they think the right way`,
                `Prospect is excited
                    about their dream.
                    Likes you and wants to
                    learn more about
                    people, opportunity to
                    achieve their dream.
                    Learned to be
                    accountable.`,
                "The book 'THE BUSINESS OF THE 21ST CENTURY.'",
                `Prospect has gained an
                    understanding and
                    respect for you. Excited
                    to go to the next step –
                    read the book, learn
                    about building assets.
                    Has passed the question
                    set test.`
            ),
            new ProspectingSteps(
                2,
                "MEET AND GREET 2",
                `Develop relationship and trust / Did they read the book?
                
                    Share steps of the process, discuss the four income
                    quadrants and four financial classifications of
                    everything. If appropriate, review the napkin plan
                    - no Amway/WWDB
                    Book into Board plan #1`,
                `Prospect has read the
                    book and is excited
                    about their dream,
                    making money, and is
                    growing to trust you.
                    Learned to be
                    accountable.`,
                "pen and paper",
                `Prospect is ready and
                    excited to review the
                    project we are doing and
                    how they might be a part
                    of it.`
            ),
            new ProspectingSteps(
                3,
                "BOARD PLAN 1",
                `Business Plan and Success Attitude

                    Homework - listen to CDs and read book in info
                    system by follow up.
                    Book follow up #1`,
                `Ready to learn about
                    a business project that
                    will allow them to
                    create income that
                    will empower their
                    dreams.
                    Learned to be
                    accountable.`,
                "Full information system",
                `Believing that the Plan is
                    doable, simple, and
                    scalable to the full
                    extent of their dream.
                    Ready to learn about
                    how to implement it in
                    their own lives.`
            ),
            new ProspectingSteps(
                4,
                "FOLLOW-UP 1",
                `Did they listen to CDs and read book?
                    Discuss distinction between Amway & WWDB;
                    discuss the partnership.
                    Explain points A.B.C.D.
                    1. 1. Plug into WWDB
                    2. 2. Changing buying habits/establish blue
                    print
                    3. 3. Franchising and duplication
                    Ask questions that are on Trevor Baker process
                    training from Las Vegas
                    Do they have any questions?
                    Product Introduction
                    Product/Comp. Plan`,
                `Meeting with questions
                    to be answered and
                    ideas of their own
                    about how to create
                    assets with the business
                    in their own life.
                    Need questions
                    answered – also need
                    to be able to review
                    the products that we
                    sell to make the
                    business real.
                    Learned to be
                    accountable.`,
                `Core PDF
                    WWDB Important dates
                    calendar
                    ww383cd 10 Core
                    Steps CD
                    Additional Rallies /
                    Attitudes`,
                `Building belief in the
                    product line and
                    possessing enough
                    information to want to tie
                    up the project with
                    knowledge about the
                    compensation plan.`
            ),
            new ProspectingSteps(
                5,
                "COMP. PLAN",
                `Did they listen to CDs, review the CORE PDF?
                    Review several examples of how the
                    compensation works.
                    At least a one-legged Platinum business and a
                    balanced business.`,
                `A good understanding
                    about the business, the
                    products, learned to
                    be accountable.
                    Need a clear
                    explanation of the
                    compensation plan.`,
                "The Richest Man in Babylon, 1 Rally CD",
                `A clear idea of how to
                    structure the business to
                    provide passive income
                    by building a team.
                    Greater trust in our
                    organization.`
            ),
            new ProspectingSteps(
                6,
                "BOARD PLAN 2",
                `Business Plan and Success Attitude

                    Book follow up #2`,
                `A good
                        understanding about
                        the business, the
                        products, learned to
                        be accountable.
                        Need a clear
                        explanation of the
                        compensation plan.`,
                `Additional audio that will relate to person (no training)

                    Rich plan Poor plan
                    WW538CD`,
                `A clear understanding
                    about the business, the
                    products, learned to be
                    accountable. Better
                    understanding about
                    WWG and the people
                    involved in the business.`
            ),
            new ProspectingSteps(
                7,
                "FOLLOW-UP 2",
                `Go over monthly and yearly overhead
                    Explain what launch looks like and finances
                    Ask do they or when would they have finances if
                    they were to receive an offer
                    Recap partnership
                    Tell them to call you tomorrow once they have
                    thought about, discussed and decided to commit
                    to partnership
                    (Listen to T. Baker training for details on all of this)`,
                `A good understanding
                    about the business, the
                    products, learned to
                    be accountable.
                    Need a clear
                    explanation of the
                    compensation plan.`,
                null,
                `Clear exposition of the
                    cost of the business
                    launch process, the
                    expected behaviors of an
                    IBO, support from the
                    team (starting with the
                    sponsor). Understanding
                    of the end of the process
                    and ready to begin as
                    soon as possible.`
            ),
            new ProspectingSteps(
                8,
                "THE CLOSE",
                `Call your active growing coach to discuss
                    possible business launch. Call the potential new
                    business owner back and inform of the decision.
                    Book launch date
                    (Again listen to audio for details)`,
                "Ready to begin."
            )
        ]
    }
}