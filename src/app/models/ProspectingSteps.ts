import { BaseModel } from '../libs/base.model';

export class ProspectingSteps extends BaseModel {
    public position: number;
    public name: string;
    public description: string;
    public pointA?: string;
    public tools?: string;
    public pointB?: string;
    constructor(properties?: ProspectingSteps | any) {
        super('ProspectingSteps');
        if (properties) {
            this.loadModel(properties, this);
        }
    }

    static getDefaultSteps(): ProspectingSteps[] {
        return <ProspectingSteps[]>[
            new ProspectingSteps({
                position: 0,
                name: "DISCOVERING PARTNER",
                description: `Discover their initial mindset and learn their
                    dream. Discover whether or not they are willing
                    to work at their dream. Discuss your goals and
                    dreams and the doors opened that will allow you
                    to attain them.`,
                pointA: `Prospect meets you for
                    the first time. Has no
                    previous interaction.`,
                tools: 'Business card',
                pointB: `Prospect thinks you're a
                    great conversationallist
                    and is excited about their
                    dream. Prospect wants
                    to talk about potential to
                    meet people who can
                    help them get their
                    dream.`
            }),
            new ProspectingSteps({
                position: 1,
                name: "MEET AND GREET 1",
                description: `Get to know the potential partners. Expand on
                    their dream and flesh it out. Develop relationship
                    and trust. Share dialog your coach had with you
                    in form of questions to identify the person's
                    mindset
                    Homework - Read book if they think the right way`,
                pointA: `Prospect is excited
                    about their dream.
                    Likes you and wants to
                    learn more about
                    people, opportunity to
                    achieve their dream.
                    Learned to be
                    accountable.`,
                tools: "The book 'THE BUSINESS OF THE 21ST CENTURY.'",
                pointB: `Prospect has gained an
                    understanding and
                    respect for you. Excited
                    to go to the next step –
                    read the book, learn
                    about building assets.
                    Has passed the question
                    set test.`
            }),
            new ProspectingSteps({
                position: 2,
                name: "MEET AND GREET 2",
                description: `Develop relationship and trust / Did they read the book?
                
                    Share steps of the process, discuss the four income
                    quadrants and four financial classifications of
                    everything. If appropriate, review the napkin plan
                    - no Amway/WWDB
                    Book into Board plan #1`,
                pointA: `Prospect has read the
                    book and is excited
                    about their dream,
                    making money, and is
                    growing to trust you.
                    Learned to be
                    accountable.`,
                tools: "pen and paper",
                pointB: `Prospect is ready and
                    excited to review the
                    project we are doing and
                    how they might be a part
                    of it.`
            }),
            new ProspectingSteps({
                position: 3,
                name: "BOARD PLAN 1",
                description: `Business Plan and Success Attitude

                    Homework - listen to CDs and read book in info
                    system by follow up.
                    Book follow up #1`,
                pointA: `Ready to learn about
                    a business project that
                    will allow them to
                    create income that
                    will empower their
                    dreams.
                    Learned to be
                    accountable.`,
                tools: "Full information system",
                pointB: `Believing that the Plan is
                    doable, simple, and
                    scalable to the full
                    extent of their dream.
                    Ready to learn about
                    how to implement it in
                    their own lives.`
            }),
            new ProspectingSteps({
                position: 4,
                name: "FOLLOW-UP 1",
                description: `Did they listen to CDs and read book?
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
                pointA: `Meeting with questions
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
                tools: `Core PDF
                    WWDB Important dates
                    calendar
                    ww383cd 10 Core
                    Steps CD
                    Additional Rallies /
                    Attitudes`,
                pointB: `Building belief in the
                    product line and
                    possessing enough
                    information to want to tie
                    up the project with
                    knowledge about the
                    compensation plan.`
            }),
            new ProspectingSteps({
                position: 5,
                name: "COMP. PLAN",
                description: `Did they listen to CDs, review the CORE PDF?
                    Review several examples of how the
                    compensation works.
                    At least a one-legged Platinum business and a
                    balanced business.`,
                pointA: `A good understanding
                    about the business, the
                    products, learned to
                    be accountable.
                    Need a clear
                    explanation of the
                    compensation plan.`,
                tools: "The Richest Man in Babylon, 1 Rally CD",
                pointB: `A clear idea of how to
                    structure the business to
                    provide passive income
                    by building a team.
                    Greater trust in our
                    organization.`
            }),
            new ProspectingSteps({
                position: 6,
                name: "BOARD PLAN 2",
                description: `Business Plan and Success Attitude

                    Book follow up #2`,
                pointA: `A good
                        understanding about
                        the business, the
                        products, learned to
                        be accountable.
                        Need a clear
                        explanation of the
                        compensation plan.`,
                tools: `Additional audio that will relate to person (no training)

                    Rich plan Poor plan
                    WW538CD`,
                pointB: `A clear understanding
                    about the business, the
                    products, learned to be
                    accountable. Better
                    understanding about
                    WWG and the people
                    involved in the business.`
            }),
            new ProspectingSteps({
                position: 7,
                name: "FOLLOW-UP 2",
                description: `Go over monthly and yearly overhead
                    Explain what launch looks like and finances
                    Ask do they or when would they have finances if
                    they were to receive an offer
                    Recap partnership
                    Tell them to call you tomorrow once they have
                    thought about, discussed and decided to commit
                    to partnership
                    (Listen to T. Baker training for details on all of this)`,
                pointA: `A good understanding
                    about the business, the
                    products, learned to
                    be accountable.
                    Need a clear
                    explanation of the
                    compensation plan.`,
                pointB: `Clear exposition of the
                    cost of the business
                    launch process, the
                    expected behaviors of an
                    IBO, support from the
                    team (starting with the
                    sponsor). Understanding
                    of the end of the process
                    and ready to begin as
                    soon as possible.`
            }),
            new ProspectingSteps({
                position: 8,
                name: "THE CLOSE",
                description: `Call your active growing coach to discuss
                    possible business launch. Call the potential new
                    business owner back and inform of the decision.
                    Book launch date
                    (Again listen to audio for details)`,
                pointA: "Ready to begin."
            })
        ];
    }
}